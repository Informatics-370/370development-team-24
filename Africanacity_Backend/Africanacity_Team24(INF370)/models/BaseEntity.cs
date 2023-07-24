using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models
{
	public abstract class BaseEntity
	{
		public DateTime? Date { get; set; }

		public DateTime? Start_Time { get; set; }

		public DateTime? End_Time { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public DateTime? DateCreated { get; set; }
		public DateTime? DateModified { get; set; }
		public bool? IsActive { get; set; } = true;
		public bool? IsDeleted { get; set; } = false;
	}
}
