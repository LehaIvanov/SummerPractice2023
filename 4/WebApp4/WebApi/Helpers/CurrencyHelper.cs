using System;
using WebApi.Entities;
using WebApi.Models.Currencies;

namespace WebApi.Helpers
{
    public class CurrencyHelper
    {
        public static void AddCurrencyData(WebApplication app)
        {
            IServiceScope scope = app.Services.CreateScope();
            DataContext? context = scope.ServiceProvider.GetService<DataContext>();
            if (context == null)
            {
                return;
            }

            var currencies = new List<Currency>
            {
                new Currency()
                {
                    Code = "CAD",
                    Description = "Accounting for approximately 2% of all global reserves, the Canadian dollar is the sixth-most held reserve currency in the world, behind the U.S. dollar, euro, yen, sterling, and renminbi. The Canadian dollar is popular with central banks because of Canada's relative economic soundness, the Canadian government's strong sovereign position, and the stability of the country's legal and political systems.",
                    Name = "Canadian dollar",
                    MaxPrice = 150,
                    MinPrice = 50,
                    Symbol = "$"
                },
                new Currency()
                {
                    Code = "PLN",
                    Description = "This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.",
                    Name = "Polish zloty",
                    MaxPrice = 120,
                    MinPrice = 70,
                    Symbol = "zł"
                },
                new Currency()
                {
                    Code = "AUD",
                    Description = "This is the official currency and legal tender of Australia, including all of its external territories, and three independent sovereign Pacific Island states: Kiribati, Nauru, and Tuvalu. As of 2022, it is currently the sixth most-traded currency in the foreign exchange market and also the seventh most-held reserve currency in global reserves.",
                    Name = "Australian dollar",
                    MaxPrice = 110,
                    MinPrice = 90,
                    Symbol = "$"
                },
                new Currency()
                {
                    Code = "JPY",
                    Description = "The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.",
                    Name = "Japanese yen",
                    MaxPrice = 105,
                    MinPrice = 85,
                    Symbol = "¥"
                },
                new Currency()
                {
                    Code = "ZAR",
                    Description = "The South African rand is legal tender in the Common Monetary Area member states of Namibia, Lesotho and Eswatini, with these three countries also having their own national currency (the dollar, the loti and the lilangeni respectively) pegged with the rand at parity and still widely accepted as substitutes. The rand was also legal tender in Botswana until 1976, when the pula replaced the rand at par.",
                    Name = "South African rand",
                    MaxPrice = 135,
                    MinPrice = 75,
                    Symbol = "R"
                }
            };
            var now = DateTime.UtcNow;
            var random = new Random();

            context.CurrencyPrices.AddRange(Enumerable.Range(1, 10).Select(index => currencies.Select(currency => new CurrencyPrice
            {
                Price = random.Next(Decimal.ToInt32(currency.MinPrice), Decimal.ToInt32(currency.MaxPrice)),
                DateTime = now.AddSeconds(index * -15),
                CurrencyCode = currency.Code,
                Currency = currency,
            })).SelectMany(items => items));
            context.SaveChanges();
        }
    }
}
