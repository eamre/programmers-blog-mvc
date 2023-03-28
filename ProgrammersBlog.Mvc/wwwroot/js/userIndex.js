$(document).ready(function () {
    const dataTable = $('#usersTable').DataTable({
        dom:
            "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
            {
                text: 'Ekle',
                attr: { id: "btnAdd", },
                className: "btn btn-success",
                action: function (e, dt, node, config) {
                }
            },
            {
                text: 'Yenile ',
                className: "btn btn-warning",
                action: function (e, dt, node, config) {
                    $.ajax({
                        type: 'GET',
                        url: '/Admin/User/GetAllUsers/',
                        contentType: "application/json",
                        beforeSend: function () {
                            $('#usersTable').hide();
                            $('.spinner-border').show();
                        },
                        success: function (data) {
                            console.log(data);
                            const userListDto = jQuery.parseJSON(data);
                            dataTable.clear();
                            console.log(userListDto);
                            if (userListDto.ResultStatus === 0) {
                                //let tableBody = "";
                                $.each(userListDto.Users.$values, function (index, user) {
                                    dataTable.row.add([
                                        user.Id,
                                        user.UserName,
                                        user.Email,
                                        user.PhoneNumber,
                                        ` <img src="/img/${user.Picture}" alt="${user.UserName}" style="max-height:50px; max-width:50px" />`,
                                        `
                                            <button class="btn btn-primary btn-block btn-update" data-id="${user.Id}"><span class="fas fa-edit"></span> Düzenle</button>
                                            <button class="btn btn-danger btn-block btn-delete" data-id="${user.Id}"><span class="fas fa-minus-circle"></span> Sil</button>
                                         `
                                    ]);
                                });
                                dataTable.draw();
                                //$('#usersTable > tbody').replaceWith(tableBody);
                                $('.spinner-border').hide();
                                $('#usersTable').fadeIn(1500);
                            }
                            else {
                                toastr.error(`${userListDto.Message}`, 'İşlem Başarısız!');
                            }
                        },
                        error: function (err) {
                            console.log(err);
                            $('.spinner-border').hide();
                            $('#usersTable').fadeIn(1500);
                            toastr.error(`${err.responseText}`, 'Hata');
                        },
                    });
                }
            }
        ],
        language: {
            "sDecimal": ",",
            "sEmptyTable": "Tabloda herhangi bir veri mevcut değil",
            "sInfo": "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Kayıt yok",
            "sInfoFiltered": "(_MAX_ kayıt içerisinden bulunan)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Sayfada _MENU_ kayıt göster",
            "sLoadingRecords": "Yükleniyor...",
            "sProcessing": "İşleniyor...",
            "sSearch": "Ara:",
            "sZeroRecords": "Eşleşen kayıt bulunamadı",
            "oPaginate": {
                "sFirst": "İlk",
                "sLast": "Son",
                "sNext": "Sonraki",
                "sPrevious": "Önceki"
            },
            "oAria": {
                "sSortAscending": ": artan sütun sıralamasını aktifleştir",
                "sSortDescending": ": azalan sütun sıralamasını aktifleştir"
            },
            "select": {
                "rows": {
                    "_": "%d kayıt seçildi",
                    "0": "",
                    "1": "1 kayıt seçildi"
                }
            }
        }
    });
    //Datatable end
    $(function () {
        const url = '/Admin/User/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });

        placeHolderDiv.on('click', '#btnSave', function (event) {
            event.preventDefault();
            const form = $('#form-user-add');
            const actionUrl = form.attr('action');
            const dataToSend = new FormData(form.get(0));
            $.ajax({
                type: 'POST',
                url: actionUrl,
                data: dataToSend,
                processData:false,
                contentType: false,
                
                success: function (data) {
                    const userAddAjaxModel = jQuery.parseJSON(data);
                    console.log(data);
                    const newFormBody = $('.modal-body', userAddAjaxModel.UserAddPartial);
                    placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                    const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                    if (isValid) {
                        placeHolderDiv.find('.modal').modal('hide');
                        dataTable.row.add([
                            userAddAjaxModel.UserDto.User.Id,
                            userAddAjaxModel.UserDto.User.UserName,
                            userAddAjaxModel.UserDto.User.Email,
                            userAddAjaxModel.UserDto.User.PhoneNumber,
                            ` <img src="/img/${userAddAjaxModel.UserDto.User.Picture}" alt="${userAddAjaxModel.UserDto.User.UserName}" style="max-height:50px; max-width:50px" />`,
                            `
                                <button class="btn btn-primary btn-block btn-update" data-id="${userAddAjaxModel.UserDto.User.Id}"><span class="fas fa-edit"></span> Düzenle</button>
                                <button class="btn btn-danger btn-block btn-delete" data-id="${userAddAjaxModel.UserDto.User.Id}"><span class="fas fa-minus-circle"></span> Sil</button>
                            `
                        ]).draw();
                        
                        toastr.success(`${userAddAjaxModel.UserDto.Message}`, 'Başarılı!');
                    }
                    else {
                        let summaryText = "";
                        $('#validation-summary>ul>li').each(function () {
                            let text = $(this).text();
                            summaryText = `*${text}\n`;
                        });
                        toastr.warning(summaryText);
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        })
    });
    $(document).on('click', '.btn-delete', function (event) {
        event.preventDefault();
        const id = $(this).attr('data-id');
        const tableRow = $(`[name="${id}"]`);
        const categoryName = tableRow.find('td:eq(1)').text();
        Swal.fire({
            title: 'Are you sure?',
            text: `${categoryName} adlı kategori silinecektir`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: { categoryId: id },
                    url: '/Admin/Category/Delete/',
                    success: function (data) {
                        const result = jQuery.parseJSON(data);
                        if (result.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `${result.Category.Name} adlı kategori başarıyla delete `,
                                'success'
                            );
                            tableRow.fadeOut(2555);
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${result.Message}`,
                                footer: '<a href="">Why do I have this issue?</a>'
                            })
                        }
                    },
                    error: function (err) {
                        console.log(err)
                        toastr.error(`${err.responseText}`, "Hata");
                    },

                })

            }
        })
    });

    $(function () {
        const url = '/Admin/Category/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click', '.btn-update', function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            $.get(url, { categoryId: id }).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find('.modal').modal('show');
            }).fail(function () {
                toastr.error("Bir hata oluştu.")
            });
        });
        /* yeni kod-category-update*/
        placeHolderDiv.on('click', '#btnUpdate', function (e) {
            e.preventDefault();
            const form = $('#form-category-update');
            const actionUrl = form.attr('action');
            const dataToSend = form.serialize();
            $.post(actionUrl, dataToSend).done(function (data) {
                console.log(data);
                const categoryUpdateAjaxModel = jQuery.parseJSON(data);
                console.log(categoryUpdateAjaxModel);
                const newFormBody = $('.modal-body', categoryUpdateAjaxModel.CategoryUpdatePartial);
                placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                if (isValid) {
                    placeHolderDiv.find('.modal').modal('hide');
                    const newTableRow = `
                      <tr name="${categoryUpdateAjaxModel.CategoryDto.Category.Id}">
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.Id}</td>
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.Name}</td>
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.Description}</td>
                                <td>${converFirstLetterToUpperCase(categoryUpdateAjaxModel.CategoryDto.Category.IsActive.toString())}</td>
                                <td>${converFirstLetterToUpperCase(categoryUpdateAjaxModel.CategoryDto.Category.IsDeleted.toString())}</td>
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.Note}</td>
                                <td>${convertToShortDate(categoryUpdateAjaxModel.CategoryDto.Category.CreatedDate)}</td>
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.CreatedByName}</td>
                                <td>${convertToShortDate(categoryUpdateAjaxModel.CategoryDto.Category.ModifiedDate)}</td>
                                <td>${categoryUpdateAjaxModel.CategoryDto.Category.ModifiedByName}</td>
                                <td>
                                   <button class="btn btn-primary btn-update" data-id="${categoryUpdateAjaxModel.CategoryDto.Category.Id}><span class="fas fa-edit"></span> Düzenle</button>
                                   <button class="btn btn-danger btn-delete" data-id="${categoryUpdateAjaxModel.CategoryDto.Category.Id}"><span class="fas fa-minus-circle"></span> Sil</button>
                                </td>
                      </tr>`;

                    const newTableRowObject = $(newTableRow);
                    const categoryTableRow = $(`[name="${categoryUpdateAjaxModel.CategoryDto.Category.Id}"]`);
                    newTableRowObject.hide();
                    categoryTableRow.replaceWith(newTableRowObject);
                    newTableRowObject.fadeIn(2000);
            
                    toastr.success(`${categoryUpdateAjaxModel.CategoryDto.Message}`, 'Başarılı!');
                } else {
                    let summaryText = "";
                    $('#validation-summary>ul>li').each(function () {
                        let text = $(this).text();
                        summaryText = `*${text}\n`;
                    });
                    toastr.warning(summaryText);
                }
            }).fail(function (response){
                console.log(response);
            });
        })
    });
});
