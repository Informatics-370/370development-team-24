using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Inventory;
// ﻿using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
	public class Employee_Role : BaseEntity
	{
		[Key]
		public int Employee_RoleId { get; set; }

		/*[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;*/

		public virtual ICollection<Employee> Employees { get; set; }

		//public List<Employee> Employees { get; set; } = new List<Employee>();
	}
}
