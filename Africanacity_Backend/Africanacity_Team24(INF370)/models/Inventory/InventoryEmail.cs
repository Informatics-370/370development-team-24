using System;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class InventoryEmail
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public InventoryEmail(string to, string subject, string content)
        {
            To = to;
            Subject = subject;
            Content = content;
        }
    }
}

