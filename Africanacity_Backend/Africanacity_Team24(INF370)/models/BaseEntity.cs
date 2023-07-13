using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models
{
    public class BaseEntity
    {

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;
    }
}
