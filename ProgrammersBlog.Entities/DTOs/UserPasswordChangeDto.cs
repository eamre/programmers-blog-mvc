using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Entities.DTOs
{
    public class UserPasswordChangeDto
    {
        [DisplayName("Kullandığınız Şifre")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(30, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(5, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [DisplayName("Yeni Şifre")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(30, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(5, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DisplayName("Yeni Şifre Tekrarı")]
        [Required(ErrorMessage = "{0} Bos Geçilemez")]
        [MaxLength(30, ErrorMessage = "{0} {1} karakterden büyük olamaz")]
        [MinLength(5, ErrorMessage = "{0} {1} karakterden küçük olamaz")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage ="Girdiğiniz Şifre Aynı Değil")]
        public string RepeatPassword { get; set; }
    }
}
