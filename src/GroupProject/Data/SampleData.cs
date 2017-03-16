using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using GroupProject.Models;

namespace GroupProject.Data
{
    public class SampleData
    {
        public async static Task Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            // Ensure db
            context.Database.EnsureCreated();

            // Ensure Stephen (IsAdmin)
            var stephen = await userManager.FindByNameAsync("Stephen.Walther@CoderCamps.com");
            if (stephen == null)
            {
                // create user
                stephen = new ApplicationUser
                {
                    UserName = "StephenIsMe",
                    Email = "Stephen.Walther@CoderCamps.com",
                    FirstName = "Stephen",
                    LastName = "Walther",
                    City = "Mesa",
                    State = "Arizona",
                    ZipCode = 85205,
                    Country = "USA",
                    Talent = "drummer",
    };
                await userManager.CreateAsync(stephen, "Secret123!");

                // add claims
                await userManager.AddClaimAsync(stephen, new Claim("IsAdmin", "true"));
            }

            // Ensure Mike (not IsAdmin)
            var mike = await userManager.FindByNameAsync("Mike@CoderCamps.com");
            if (mike == null)
            {
                // create user
                mike = new ApplicationUser
                {
                    UserName = "MikeIsMe",
                    Email = "Mike@CoderCamps.com",
                    FirstName = "Mike",
                    LastName = "Smith",
                    City = "Scottsdale",
                    State = "Arizona",
                    ZipCode = 85258,
                    Country = "USA",
                    Talent = "violin",
                };
                await userManager.CreateAsync(mike, "Secret123!");
            }


        }

    }
}
