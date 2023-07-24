using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Currency;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrenciesController : ControllerBase
    {
        private ICurrencyService _currencyService;

        public CurrenciesController(ICurrencyService userService)
        {
            _currencyService = userService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _currencyService.GetAll();
            return Ok(users);
        }

        [HttpGet("{code}")]
        public IActionResult GetByCode(string code)
        {
            var user = _currencyService.GetByCode(code);
            return Ok(user);
        }

        [HttpGet("/prices")]
        public IActionResult GetPriceChanges(GetPricesRequest model)
        {

        }
    }
}
