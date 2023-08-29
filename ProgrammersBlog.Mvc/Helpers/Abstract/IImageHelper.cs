using Microsoft.AspNetCore.Http;
using ProgrammersBlog.Entities.DTOs;
using ProgrammersBlog.Shared.Utilities.Results.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgrammersBlog.Mvc.Helpers.Abstract
{
    public interface IImageHelper
    {
        Task<IDataResults<ImageUploadedDto>> UploadUserImage(string userName, IFormFile pictureFile, string folderName = "userImages");
        IDataResults<ImageDeletedDto> Delete(string pictureName);
    }
}
