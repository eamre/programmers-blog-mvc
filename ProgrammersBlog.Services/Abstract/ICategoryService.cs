using ProgrammersBlog.Entities.Concrete;
using ProgrammersBlog.Entities.DTOs;
using ProgrammersBlog.Shared.Utilities.Results.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Services.Abstract
{
    public interface ICategoryService
    {
        Task<IDataResults<CategoryDto>> Get(int categoryId);
        Task<IDataResults<CategoryUpdateDto>> GetCategoryUpdateDto(int categoryId);
        Task<IDataResults<CategoryListDto>> GetAll();
        Task<IDataResults<CategoryListDto>> GetAllByNonDeleted();
        Task<IDataResults<CategoryListDto>> GetAllByNonDeletedAndActive();
        Task<IDataResults<CategoryDto>> Add(CategoryAddDto categoryAddDto,string createdByName);
        Task<IDataResults<CategoryDto>> Update(CategoryUpdateDto categoryUpdateDto, string modifiedByName);
        Task<IDataResults<CategoryDto>> Delete(int categoryId, string modifiedByName);
        Task<IResult> HardDelete(int categoryId);

    }
}
