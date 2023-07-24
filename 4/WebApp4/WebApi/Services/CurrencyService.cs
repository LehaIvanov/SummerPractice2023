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
                (model.ToDateTime == null || c.DateTime <= model.ToDateTime));
        }
    }
}
