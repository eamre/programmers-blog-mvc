
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
        const userName = tableRow.find('td:eq(1)').text();
        Swal.fire({
            title: 'Are you sure?',
            text: `${userName} adlı user silinecektir`,
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
                    data: { userId: id },
                    url: '/Admin/User/Delete/',
                    success: function (data) {
                        const user = jQuery.parseJSON(data);
                        console.log(user);
                        if (user.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `${user.User.UserName} adlı user başarıyla delete `,
                                'success'
                            );
                            //    tableRow.fadeOut(2555);
                            dataTable.row(tableRow).remove().draw();
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${user.Message}`,
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
    //user update get
    $(function () {
        const url = '/Admin/User/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click', '.btn-update', function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            $.get(url, { userId: id }).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find('.modal').modal('show');
            }).fail(function () {
                toastr.error("Bir hata oluştu.")
            });
        });
        /* yeni kod-user-update*/
        placeHolderDiv.on('click', '#btnUpdate', function (e) {
            e.preventDefault();
            const form = $('#form-user-update');
            const actionUrl = form.attr('action');
            const dataToSend = new FormData(form.get(0));
            $.ajax({
                type: 'POST',
                url: actionUrl,
                data: dataToSend,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    const userUpdateAjaxModel = jQuery.parseJSON(data);
                    console.log(userUpdateAjaxModel);
                    const id = userUpdateAjaxModel.UserUpdateDto.Id;
                    const tableRow = $(`[name="${id}"]`);
                    const newFormBody = $('.modal-body', userUpdateAjaxModel.UserUpdatePartial);
                    placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                    const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                    if (isValid) {
                        placeHolderDiv.find('.modal').modal('hide');
                        dataTable.row(tableRow).data([
                            userUpdateAjaxModel.UserDto.User.Id,
                            userUpdateAjaxModel.UserDto.User.UserName,
                            userUpdateAjaxModel.UserDto.User.Email,
                            userUpdateAjaxModel.UserDto.User.PhoneNumber,
                            ` <img src="/img/${userUpdateAjaxModel.UserDto.User.Picture}" alt="${userUpdateAjaxModel.UserDto.User.UserName}" class="my-image-table" />`,
                            `
                                <button class="btn btn-primary btn-block btn-update" data-id="${userUpdateAjaxModel.UserDto.User.Id}"><span class="fas fa-edit"></span> Düzenle</button>
                                <button class="btn btn-danger btn-block btn-delete" data-id="${userUpdateAjaxModel.UserDto.User.Id}"><span class="fas fa-minus-circle"></span> Sil</button>
                            `
                        ]);
                        tableRow.attr("name", `${id}`);
                        dataTable.row(tableRow).invalidate();
                        toastr.success(`${userUpdateAjaxModel.UserDto.Message}`, 'Başarılı!');
                    } else {
                        let summaryText = "";
                        $('#validation-summary>ul>li').each(function () {
                            let text = $(this).text();
                            summaryText = `*${text}\n`;
                        });
                        toastr.warning(summaryText);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    });
});
