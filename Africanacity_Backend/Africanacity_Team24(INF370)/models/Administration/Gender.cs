using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class Gender

    {
        [Key]

        public int GenderId { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Gender> Genders { get; set; }
    }
}
