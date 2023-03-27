using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Entities.DTOs
{
    public class UserAddDto
    {
        [DisplayName("Kullanıcı Adı")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(50, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(3, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        public string UserName { get; set; }

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

        [DisplayName("Tel. No")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(13, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(13, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [DisplayName("Resim")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [DataType(DataType.Upload)]
        public IFormFile PictureFile { get; set; }
        public string Picture { get; set; }

    }
}
