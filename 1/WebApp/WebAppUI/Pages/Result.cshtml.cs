using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebAppUI.Models;

namespace WebAppUI.Pages
{
    public class ResultModel : PageModel
    {
        public string FullName { get; set; } = "";

        public void OnGet(Person person)
        {
            FullName = $"{person.Name} {person.LastName}, {person.Age}";
        }
    }
}
