using System;

namespace PersonalAlbumCollection.Models
{
    public class Comment
    {
        public string Description { get; set; }
        public string UserName { get; set; }
        public DateTime CommentedOn { get; set; }
    }
}