using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupProject.Services;
using GroupProject.Models;
using GroupProject.Interfaces;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupProject.API
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserServices _usrService;
        private UserManager<ApplicationUser> _userManager;

        public UsersController(IUserServices usrService, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _usrService = usrService;
        }

        [HttpGet]
        public List<ApplicationUser> Get()
        {
            return _usrService.GetUsers();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ApplicationUser Get(string id)
        {
            return _usrService.GetUser(User.Identity.Name
                );
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]ApplicationUser user)
        {
            if (ModelState.IsValid)
            {
                var uid = _userManager.GetUserId(User);
                _usrService.SaveProfile(user, uid);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _usrService.DeleteUser(id);
            return Ok();
        }
    }
}
