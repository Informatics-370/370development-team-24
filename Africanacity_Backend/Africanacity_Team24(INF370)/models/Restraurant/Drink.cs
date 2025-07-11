﻿using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Drink
	{
		[Key]
		public int DrinkId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		public List<Order> Orders { get; set; } = new List<Order>();

		public List<Drink_Price> DrinkPrices { get; set; } = new List<Drink_Price>();


	}
}
