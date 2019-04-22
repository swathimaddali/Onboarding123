using System;
using System.Collections.Generic;

namespace Onboarding123.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int Productid { get; set; }
        public int Customerid { get; set; }
        public int Storeid { get; set; }
        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
    }
}
