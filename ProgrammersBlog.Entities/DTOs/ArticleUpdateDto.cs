using ProgrammersBlog.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Entities.DTOs
{
    public class ArticleUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [DisplayName("Başlık")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MaxLength(100, ErrorMessage = "{0} alanı {1} karakterden büyük olmamalı")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string Title { get; set; }

        [DisplayName("İçerik")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string Content { get; set; }

        [DisplayName("Thumbnail")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MaxLength(250, ErrorMessage = "{0} alanı {1} karakterden büyük olmamalı")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string Thumbnail { get; set; }

        [DisplayName("Tarih")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Date { get; set; }

        [DisplayName("Seo Yazar")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MaxLength(50, ErrorMessage = "{0} alanı {1} karakterden büyük olmamalı")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string SeoAuthor { get; set; }

        [DisplayName("Seo Açıklama")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MaxLength(150, ErrorMessage = "{0} alanı {1} karakterden büyük olmamalı")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string SeoDescription { get; set; }

        [DisplayName("Seo Etiket")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        [MaxLength(70, ErrorMessage = "{0} alanı {1} karakterden büyük olmamalı")]
        [MinLength(3, ErrorMessage = "{0} alanı {1} karakterden küçük olmamalı")]
        public string SeoTags { get; set; }

        [DisplayName("Kategori")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }


        [DisplayName("Aktif mi?")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        public bool IsActive { get; set; }

        [DisplayName("Silinsin mi??")]
        [Required(ErrorMessage = "{0} alanı boş geçilmemeli")]
        public bool IsDeleted { get; set; }
    }
}
