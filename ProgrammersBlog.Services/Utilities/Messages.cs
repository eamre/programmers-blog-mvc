using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Services.Utilities
{
    public static class Messages
    {
        public static class Category
        {
            public static string NotFound(bool isPlural) {
                if (isPlural)
                    return "Hiç bir kategori bulunamadı";
                else
                    return "Boyle bir kategori bulunamadı";
            }

            public static string Add(string categoryName)
            {
                return $"{categoryName} adlı kategori başarıyla eklenmiştir";
            }

            public static string Update(string categoryName)
            {
                return $"{categoryName} adlı kategori başarıyla güncellendi";
            }
            public static string Delete(string categoryName)
            {
                return $"{categoryName} adlı kategori başarıyla silindi";
            }
            public static string HardDelete(string categoryName)
            {
                return $"{categoryName} adlı kategori başarıyla veritabanından silindi";
            }
        }
        public static class Article
        {
            public static string NotFound(bool isPlural)
            {
                if (isPlural)
                    return "Hiç bir makale bulunamadı";
                else
                    return "Böyle bir makale bulunamadı";
            }
            public static string Add(string articleName)
            {
                return $"{articleName} adlı makale başarıyla eklenmiştir";
            }
            public static string Update(string articleName)
            {
                return $"{articleName} adlı makale başarıyla güncellendi";
            }
            public static string Delete(string articleName)
            {
                return $"{articleName} adlı makale başarıyla silindi";
            }
            public static string HardDelete(string articleName)
            {
                return $"{articleName} adlı makale başarıyla veritabanından silindi";
            }
        }
    }
}
