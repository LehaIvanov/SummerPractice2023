using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebAppUI.Models;

namespace WebAppUI.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public Person? Person { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            if (Person == null)
            {
                return RedirectToPage("./Index");
            }

            return RedirectToPage("./Result", new Person() { Age = Person.Age, Name = Person.Name, LastName = Person.LastName });

        }
    }
}
