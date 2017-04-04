using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using GroupProject.Models;

namespace GroupProject.Interfaces
{
    public interface IPostService
    {
        void DeletePost(int id);
        Post GetPostById(int id);
        List<Post> GetUserPosts(string userId);
        List<Post> GetPosts();
        ApplicationUser GetUserByName(string userName);
        Task SavePost(IPrincipal user, Post post);
    }
}