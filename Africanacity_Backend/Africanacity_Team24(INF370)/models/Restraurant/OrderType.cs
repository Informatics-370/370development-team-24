namespace Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;


public class OrderType
{
    [Key]
    public int OrderType_ID { get; set; }

    [MaxLength(50)]
    public string Name { get; set; }
}
