using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models
{
    public class BaseEntity
    {

        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
