using AutoMapper;
using ProgrammersBlog.Data.Abstract;
using ProgrammersBlog.Entities.Concrete;
using ProgrammersBlog.Entities.DTOs;
using ProgrammersBlog.Services.Abstract;
using ProgrammersBlog.Shared.Utilities.Results.Abstract;
using ProgrammersBlog.Shared.Utilities.Results.complexTypes;
using ProgrammersBlog.Shared.Utilities.Results.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProgrammersBlog.Services.Concrete
{
    public class CategoryManager : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IDataResults<CategoryDto>> Add(CategoryAddDto categoryAddDto, string createdByName)
        {
            //await _unitOfWork.Categories.AddAsync(new Category
            //{
            //    Name=categoryAddDto.Name,
            //    Description=categoryAddDto.Description,
            //    Note=categoryAddDto.Note,
            //    IsActive=categoryAddDto.IsActive,
            //    CreatedByName=createdByName,
            //    CreatedDate=DateTime.Now,
            //    ModifiedByName=createdByName,
            //    ModifiedDate=DateTime.Now,
            //    IsDeleted=false
            //}).ContinueWith(t=>_unitOfWork.SaveAsync());

            // await _unitOfWork.SaveAsync();
            var category = _mapper.Map<Category>(categoryAddDto);
            category.CreatedByName = createdByName;
            category.ModifiedByName = createdByName;
            var addedCategory = await _unitOfWork.Categories.AddAsync(category);
            await _unitOfWork.SaveAsync();
            return new DataResult<CategoryDto>(ResultStatus.Success, $"{categoryAddDto.Name} adlı kategori başarıyla eklenmiştir", new CategoryDto 
            { 
                Category=addedCategory,
                ResultStatus=ResultStatus.Success,
                Message=$"{categoryAddDto.Name} adlı kategori başarıyla eklenmiştir"
            });
        }

        public async Task<IDataResults<CategoryDto>> Update(CategoryUpdateDto categoryUpdateDto, string modifiedByName)
        {
            var category = await _unitOfWork.Categories.GetAsync(c => c.Id == categoryUpdateDto.Id);
            if (category != null)
            {
                //category.Name = categoryUpdateDto.Name;
                //category.Description = categoryUpdateDto.Description;
                //category.Note = categoryUpdateDto.Note;
                //category.IsActive = categoryUpdateDto.IsActive;
                //category.IsDeleted = categoryUpdateDto.IsDeleted;
                //category.ModifiedByName = modifiedByName;
                //category.ModifiedDate = DateTime.Now;

                //await _unitOfWork.Categories.UpdateAsync(category).ContinueWith(t=>_unitOfWork.SaveAsync());
                var oldCategory = await _unitOfWork.Categories.GetAsync(c => c.Id == categoryUpdateDto.Id);
                var categoryup = _mapper.Map<CategoryUpdateDto, Category>(categoryUpdateDto, oldCategory);
                categoryup.ModifiedByName = modifiedByName;
                categoryup.ModifiedDate = DateTime.Now;
                var updatedCategory=await _unitOfWork.Categories.UpdateAsync(categoryup);
                await _unitOfWork.SaveAsync();
                return new DataResult<CategoryDto>(ResultStatus.Success, $"{categoryUpdateDto.Name} adlı kategori başarıyla güncellendi", new CategoryDto
                {
                    Category = updatedCategory,
                    ResultStatus = ResultStatus.Success,
                    Message = $"{categoryUpdateDto.Name} adlı kategori başarıyla güncellendi"
                });

            }
            return new DataResult<CategoryDto>(ResultStatus.Error, "Boyle bir kategori bulunamadı",null);
        }

        public async Task<IResult> HardDelete(int categoryId)
        {
            var category = await _unitOfWork.Categories.GetAsync(c => c.Id == categoryId);
            if (category != null)
            {
                await _unitOfWork.Categories.DeleteAsync(category);
                await _unitOfWork.SaveAsync();
                return new Result(ResultStatus.Success, $"{category.Name} adlı kategori başarıyla veritabanından silindi");
            }
            return new Result(ResultStatus.Error, "Boyle bir kategori bulunamadı");
        }
        
        public async Task<IDataResults<CategoryDto>> Delete(int categoryId, string modifiedByName)
        {
            var category = await _unitOfWork.Categories.GetAsync(c => c.Id == categoryId);
            if (category != null)
            {
                category.IsDeleted = true;
                category.ModifiedByName = modifiedByName;
                category.ModifiedDate = DateTime.Now;

                var deletedCategory = await _unitOfWork.Categories.UpdateAsync(category);
                await _unitOfWork.SaveAsync();
                return new DataResult<CategoryDto>(ResultStatus.Success, $"{deletedCategory.Name} adlı kategori başarıyla silindi", new CategoryDto
                {
                    Category = deletedCategory,
                    ResultStatus = ResultStatus.Success,
                    Message = $"{deletedCategory.Name} adlı kategori başarıyla silindi"
                });
            }
            return new DataResult<CategoryDto>(ResultStatus.Error, "Boyle bir kategori bulunamadı", new CategoryDto
            {
                Category = null,
                ResultStatus = ResultStatus.Error,
                Message = $"Boyle bir kategori bulunamadı"
            });
        }

        public async Task<IDataResults<CategoryDto>> Get(int categoryId)
        {
            var category = await _unitOfWork.Categories.GetAsync(c => c.Id==categoryId, c=>c.Articles);
            if (category != null)
            {
                return new DataResult<CategoryDto>(ResultStatus.Success, new CategoryDto 
                { 
                    Category= category,
                    ResultStatus=ResultStatus.Success
                }) ;
            }
            return new DataResult<CategoryDto>(ResultStatus.Error, "Boyle bir kategori bulunamadı", new CategoryDto
            {
                Category = null,
                ResultStatus = ResultStatus.Error,
                Message = "Boyle bir kategori bulunamadı"
            });
        }

        public async Task<IDataResults<CategoryListDto>> GetAll()
        {
            var categories = await _unitOfWork.Categories.GetAllAsync(null, c => c.Articles);
            if (categories.Count > -1)
            {
                return new DataResult<CategoryListDto>(ResultStatus.Success, new CategoryListDto
                {
                    Categories = categories,
                    ResultStatus = ResultStatus.Success
                });
            }
            return new DataResult<CategoryListDto>(ResultStatus.Error, "Hiç bir kategori bulunamadı", new CategoryListDto { 
                Categories=null,
                ResultStatus=ResultStatus.Error,
                Message= "Hiç bir kategori bulunamadı"
            });

        }

        public async Task<IDataResults<CategoryListDto>> GetAllByNonDeleted()
        {
            var categories = await _unitOfWork.Categories.GetAllAsync(c => c.IsDeleted == false,c=>c.Articles);
            if (categories.Count > -1)
            {
                return new DataResult<CategoryListDto>(ResultStatus.Success, new CategoryListDto
                {
                    Categories = categories,
                    ResultStatus = ResultStatus.Success
                });
            }
            return new DataResult<CategoryListDto>(ResultStatus.Error, "Hiç bir kategori bulunamadı", new CategoryListDto
            {
                Categories = null,
                ResultStatus = ResultStatus.Error,
                Message = "Hiçbir kategori bulunamadı"
            });
        }


        public async Task<IDataResults<CategoryListDto>> GetAllByNonDeletedAndActive()
        {
            var categories = await _unitOfWork.Categories.GetAllAsync(c => c.IsDeleted == false &&c.IsActive, c => c.Articles);
            if (categories.Count > -1)
            {
                return new DataResult<CategoryListDto>(ResultStatus.Success, new CategoryListDto
                {
                    Categories = categories,
                    ResultStatus = ResultStatus.Success
                });
            }
            return new DataResult<CategoryListDto>(ResultStatus.Error, "Hiç bir kategori bulunamadı", null);
        }

        public async Task<IDataResults<CategoryUpdateDto>> GetCategoryUpdateDto(int categoryId)
        {
            var result = await _unitOfWork.Categories.AnyAsync(c => c.Id == categoryId);
            if (result)
            {
                var category = await _unitOfWork.Categories.GetAsync(c => c.Id == categoryId);
                var categoryUpdateDto = _mapper.Map<CategoryUpdateDto>(category);
                return new DataResult<CategoryUpdateDto>(ResultStatus.Success,categoryUpdateDto);
            }
            else
            {
                return new DataResult<CategoryUpdateDto>(ResultStatus.Error, "Boyle bir kategori bulunamadı",null);
            }
        }
    }
}
