using System;
using System.Collections.Generic;
using System.Web.Http;
using PersonalAlbumCollection.Models;

namespace PersonalAlbumCollection.Controllers
{
    public class HomeController : ApiController
    {
        [ActionName("GetUserName")]
        public string GetUserName()
        {
            var usr = User.Identity.Name;
            return System.Web.HttpContext.Current.User.Identity.Name.Split('\\')[1].Trim('"');
            //return "Seshu";
        }

        [ActionName("GetImagesDetails")]
        public List<ImageDetails> GetImages()
        {
            return GetImagesDetails();
        }


        private List<ImageDetails> GetImagesDetails()
        {
            return new List<ImageDetails>
                {
                    new ImageDetails
                        {
                            ImageUrl = "http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_01.png",
                            ImageTitle = "Image1",
                            Comments = new List<Comment>
                                {
                                    new Comment
                                        {
                                            Description = "I Like this",
                                            UserName = "miriyals",
                                            CommentedOn = DateTime.Now.AddHours(-1),
                                        }
                                },
                                Likes = new List<string>{ "miriyals", "danturts"}
                        },
                        new ImageDetails
                        {
                            ImageUrl = "http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_02.png",
                            ImageTitle = "Image2",
                            Comments = new List<Comment>
                                {
                                    new Comment
                                        {
                                            Description = "I Like this",
                                            UserName = "miriyals",
                                            CommentedOn = DateTime.Now.AddHours(-1),
                                        }
                                },
                                Likes = new List<string>{ "miriyals", "danturts"}
                        }
                };
        }
    }
}
