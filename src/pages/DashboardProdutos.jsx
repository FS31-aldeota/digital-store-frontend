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
import { useCreateProduto, useDestroyProduto, useGetProdutos, useUpdateProduto } from "../hooks/produtoHooks";

const DashboardProdutosContainer = styled.div`

`;

const DashboardProdutos = () => {
    const [customers, setCustomers] = useState([]);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const { register: registerCreate, handleSubmit: handleCreate, reset: resetCreate } = useForm();
    const { register: registerUpdate, handleSubmit: handleUpdate, setValue: setValueUpdate } = useForm();

    const toast = useRef();

    const { data: listaProdutos } = useGetProdutos();
    const { mutateAsync: criarProduto } = useCreateProduto();
    const { mutateAsync: editarProduto } = useUpdateProduto();
    const { mutateAsync: deletarProduto } = useDestroyProduto();

    function criar(dados) {
        criarProduto(dados, {
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
        editarProduto(dados, {
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
                deletarProduto(id, {
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
        <DashboardProdutosContainer>
            <h3 className="flex justify-between align-middle text-4xl text-black mb-4">
                Produtos
                <button
                    className="border-rounded-md bg-primary-1 p-2 rounded-md text-white text-sm"
                    onClick={() => setVisibleCreate(true)}
                >
                    nova produto
                </button>
            </h3>
            <DataTable
                value={listaProdutos}
                stripedRows
                paginator
                emptyMessage={() => (
                    <div style={{ textAlign: 'center' }}>{'Nenhuma informação encontrada'}</div>
                )}
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="produto_id" header="ID"></Column>
                <Column field="produto_nome" header="Nome"></Column>
                <Column field="produto_descricao" header="Descricao"></Column>
                <Column
                    header="Ações"
                    className="w-1"
                    body={(row) => (
                        <div className="flex gap-3">
                            <i 
                                className="pi pi-pencil text-primary-1 p-2"
                                onClick={() => {
                                    setValueUpdate('produto_id', row.produto_id);
                                    setValueUpdate('produto_nome', row.produto_nome);
                                    setVisibleEdit(true);
                                }}
                            ></i>
                            <i
                                className="pi pi-trash text-primary-1 p-2"
                                onClick={() => deletar(row.produto_id)}
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
                className="bg-white p-4"
            >
                <form onSubmit={handleCreate(criar)}>
                    <label htmlFor="">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome da produto"
                        {...registerCreate('produto_nome', { required: true })}
                    />
                    <button>Criar</button>
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
                    <input type="hidden" {...registerUpdate('produto_id')} />
                    <label htmlFor="">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome da produto"
                        {...registerUpdate('produto_nome', { required: true })}
                    />
                    <button>Editar</button>
                </form>
            </Sidebar>
            <ConfirmDialog />
            <Toast ref={toast} position="bottom-right" />
        </DashboardProdutosContainer>
    );
}

export default DashboardProdutos;