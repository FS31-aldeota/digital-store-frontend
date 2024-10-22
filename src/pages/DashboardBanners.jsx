import "primereact/resources/themes/lara-light-pink/theme.css";
import "primeicons/primeicons.css";
import { styled } from "styled-components";
import { DataTable } from 'primereact/datatable';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { useRef, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useForm } from "react-hook-form";
import { useCreateBanner, useDestroyBanner, useGetBanners, useUpdateBanner } from "../hooks/bannerHooks";

const DashboardBannersContainer = styled.div``;

const DashboardBanners = () => {
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const { register: registerCreate, handleSubmit: handleCreate, reset: resetCreate, setValue: setValueCreate } = useForm();
    const { register: registerUpdate, handleSubmit: handleUpdate, setValue: setValueUpdate } = useForm();

    const toast = useRef();

    const { data: listarBanners } = useGetBanners();
    const { mutateAsync: criarBanner } = useCreateBanner();
    const { mutateAsync: editarBanner } = useUpdateBanner();
    const { mutateAsync: deletarBanner } = useDestroyBanner();

    function criar(dados) {
        criarBanner(dados, {
            onSuccess: (data) => {
                setVisibleCreate(false);
                resetCreate();
                toast.current.show({
                    detail: data.detail,
                    severity: data.severity
                })
            },
            onError: (error) => {
                setVisibleCreate(false);
                toast.current.show({
                    detail: error.detail,
                    severity: error.severity
                })
            }
        })
    }

    function editar(dados) {
        editarBanner(dados, {
            onSuccess: (data) => {
                setVisibleEdit(false);
                toast.current.show({
                    detail: data.detail,
                    severity: data.severity
                })
            },
            onError: (error) => {
                setVisibleEdit(false);
                toast.current.show({
                    detail: error.detail,
                    severity: error.severity
                })
            }
        })
    }

    function deletar(id) {
        confirmDialog({
            header: 'Aviso',
            message: 'Deseja realmente apagar este item?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                deletarBanner(id, {
                    onSuccess: (data) => {
                        toast.current.show({
                            detail: data.detail,
                            severity: data.severity
                        })
                    },
                    onError: (error) => {
                        toast.current.show({
                            detail: error.detail,
                            severity: error.severity
                        })
                    }
                })
            }
        });
    }


    return (
        <DashboardBannersContainer>
            <h3 className="flex justify-between align-middle text-4xl text-black mb-4">
                Banners
                <button
                    className="border-rounded-md bg-primary-1 p-2 rounded-md text-white text-sm"
                    onClick={() => setVisibleCreate(true)}
                >
                    nova banner
                </button>
            </h3>
            <DataTable
                value={listarBanners}
                stripedRows
                paginator
                emptyMessage={() => (
                    <div style={{ textAlign: 'center' }}>{'Nenhuma informação encontrada'}</div>
                )}
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="banner_id" header="ID"></Column>
                <Column field="banner_nome" header="Nome"></Column>
                <Column field="banner_titulo" header="Titulo"></Column>
                <Column field="banner_link" header="Link"></Column>
                <Column 
                    header="Inserido em"
                    body={(rowData) => (
                        <div>{rowData.criado_em.split('T')[0].split('-').reverse().join('/')}</div>
                    )}
                ></Column>
                <Column
                    header="Ações"
                    className="w-1"
                    body={(row) => (
                        <div className="flex gap-3">
                            <i 
                                className="pi pi-pencil text-primary-1 p-2"
                                onClick={() => {
                                    setValueUpdate('banner_id', row.banner_id);
                                    setValueUpdate('banner_nome', row.banner_nome);
                                    setVisibleEdit(true);
                                }}
                            ></i>
                            <i
                                className="pi pi-trash text-primary-1 p-2"
                                onClick={() => deletar(row.banner_id)}
                            ></i>
                        </div>
                    )}
                />
            </DataTable>

            <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position="right"
                header={"Criar"}
                className="bg-white text-300"
            >
                <form onSubmit={handleCreate(criar)}>
                    <label 
                        htmlFor="nome"
                        className="block mb-1 font-bold"
                    >Nome</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Nome da banner"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        {...registerCreate('banner_nome', { required: true })}
                    />
                    <label 
                        htmlFor="subtitulo"
                        className="block mb-1 font-bold"
                    >Subtitulo</label>
                    <input
                        id="subtitulo"
                        type="text"
                        placeholder="Subtitulo"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        {...registerCreate('banner_subtitulo', { required: true })}
                    />
                    <label 
                        htmlFor="titulo"
                        className="block mb-1 font-bold"
                    >Titulo</label>
                    <input
                        id="titulo"
                        type="text"
                        placeholder="Titulo"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        {...registerCreate('banner_titulo', { required: true })}
                    />
                    <label 
                        htmlFor="descricao"
                        className="block mb-1 font-bold"
                    >Descrição</label>
                    <input
                        id="descricao"
                        type="text"
                        placeholder="Descrição"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        {...registerCreate('banner_descricao', { required: true })}
                    />
                    <label 
                        htmlFor="link"
                        className="block mb-1 font-bold"
                    >Link</label>
                    <input
                        id="link"
                        type="text"
                        placeholder="Link"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        {...registerCreate('banner_link', { required: true })}
                    />
                    <label 
                        htmlFor="imagem"
                        className="block mb-1 font-bold"
                    >Imagem</label>
                    <input
                        id="imagem"
                        type="file"
                        className="w-full h-[40px] pl-2 bg-white border mb-3"
                        onChange={(e) => {
                            setValueCreate('banner_imagem', e.target.files[0])
                        }}
                    />
                    <button className="bg-primary-1 h-[40px] text-white w-full">Criar</button>
                </form>
            </Sidebar>
            <Sidebar
                visible={visibleEdit}
                onHide={() => setVisibleEdit(false)}
                position="right"
                header={"Editar"}
                className="bg-white p-4"
            >
                <form onSubmit={handleUpdate(editar)}>
                    <input type="hidden" {...registerUpdate('banner_id')} />
                    <label htmlFor="">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome da banner"
                        {...registerUpdate('banner_nome', { required: true })}
                    />
                    <button>Editar</button>
                </form>
            </Sidebar>
            <ConfirmDialog />
            <Toast ref={toast} position="bottom-right" />
        </DashboardBannersContainer>
    );
}

export default DashboardBanners;