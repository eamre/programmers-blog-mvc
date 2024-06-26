﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Entities.DTOs
{
    public class UserLoginDto
    {
        [DisplayName("Email")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(100, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(10, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DisplayName("Şifre")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(30, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(5, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DisplayName("Beni Hatırla")]
        public bool RememberMe { get; set; }

    }
}
