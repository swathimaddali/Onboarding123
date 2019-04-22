using System;
using System.Collections.Generic;

namespace Onboarding123.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
