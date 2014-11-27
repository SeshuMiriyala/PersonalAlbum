using System.Collections.Generic;

namespace PersonalAlbumCollection.Models
{
    public class ImageDetails
    {
        public string ImageUrl { get; set; }
        public string ImageTitle { get; set; }
        public List<string> Likes { get; set; }
        public List<Comment> Comments { get; set; }
    }
}