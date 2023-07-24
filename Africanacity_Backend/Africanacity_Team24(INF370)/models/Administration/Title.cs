using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class Title
    {
		[Key]
		public int TitleId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;
		public List<User> Users { get; set; } = new List<User>();

	}
}
