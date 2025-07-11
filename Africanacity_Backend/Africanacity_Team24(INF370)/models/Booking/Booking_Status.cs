﻿using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Booking_Status
	{
		[Key]
		public int Booking_StatusId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;
		public List<Bookings> Booking { get; set; } = new List<Bookings>();

	}
}
