using System.Collections.Generic;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Currencies;
using WebApi.Models.Currency;

namespace WebApi.Services
{
    public interface ICurrencyService
    {
        IEnumerable<Currency> GetAll();
        Currency GetByCode(string code);
        IEnumerable<PriceChange> GetPriceChanges(GetPricesRequest model);
    }

    public class CurrencyService : ICurrencyService
    {
        private DataContext _context;

        public CurrencyService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Currency> GetAll()
        {
            return _context.Currencies;
        }

        public Currency GetByCode(string code)
        {
            var user = _context.Currencies.Find(code);
            if (user == null) throw new KeyNotFoundException("Currency not found");
            return user;
        }

        public IEnumerable<PriceChange> GetPriceChanges(GetPricesRequest model)
        {
            var purchasedCurrency = model.PurchasedCurrency;
            var paymentCurrency = model.PaymentCurrency;
            var currencyCodes = _context.Currencies.Select(c => c.Code);
            if (!currencyCodes.Contains(purchasedCurrency))
            {
                throw new AppException($"Unknown currency {purchasedCurrency}");
            } else if (!currencyCodes.Contains(paymentCurrency))
            {
                throw new AppException($"Unknown currency {paymentCurrency}");
            }

            var changes = _context.CurrencyPrices.Where(c =>
                (c.CurrencyCode == purchasedCurrency || c.CurrencyCode == paymentCurrency) &&
                c.DateTime >= model.FromDateTime &&
                (model.ToDateTime == null || c.DateTime <= model.ToDateTime)).OrderBy(c => c.DateTime).ToList();
            var first = changes.FirstOrDefault();

            if (first == null)
            {
                throw new AppException($"Unexpected error! No prices for currencies {paymentCurrency}, {purchasedCurrency}");
            }

            Decimal purchasedCurrencyPrice = first.Price;
            Decimal paymentCurrencyPrice = first.Price;

            if (first.CurrencyCode == purchasedCurrency)
            {
                paymentCurrencyPrice = GetLastPriceChangeBeforeDate(first.DateTime, paymentCurrency)?.Price ?? paymentCurrencyPrice;
            }
            else
            {
                purchasedCurrencyPrice = GetLastPriceChangeBeforeDate(first.DateTime, purchasedCurrency)?.Price ?? purchasedCurrencyPrice;
            }

            var result = new List<PriceChange>();

            foreach (var change in changes)
            {
                if (change.CurrencyCode == paymentCurrency)
                {
                    paymentCurrencyPrice = change.Price;
                }
                else
                {
                    purchasedCurrencyPrice = change.Price;
                }

                result.Add(new PriceChange
                {
                    DateTime = change.DateTime,
                    PaymentCurrencyCode = paymentCurrency,
                    PurchasedCurrencyCode = purchasedCurrency,
                    Price = Decimal.Round(purchasedCurrencyPrice / paymentCurrencyPrice, 3, MidpointRounding.ToPositiveInfinity)
                });
            }

            return result;
        }

        private CurrencyPrice? GetLastPriceChangeBeforeDate(DateTime date, string currencyCode) 
        {
            return _context.CurrencyPrices.Where(c => c.CurrencyCode == currencyCode && c.DateTime <= date).OrderBy(c => c.DateTime).LastOrDefault();
        }
    }
}
