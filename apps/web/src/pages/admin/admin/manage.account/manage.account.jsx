import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import AccountsTable from '../../../../components/AccountsTable';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { IoClose } from 'react-icons/io5';

function ManageAccount() {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState('');
    const [editAccount, setEditAccount] = useState(null);

    const handleClick = async () => {
        try {
            if (editAccount) {
                await axios.patch(
                    `http://localhost:8000/api/accounts/update-account/${editAccount.id}`,
                    {
                        account: newAccount
                    },
                )
            } else {
                await axios.post('http://localhost:8000/api/accounts', {
                    account: newAccount
                })
            }

            const response = await axios.get('http://localhost:8000/api/accounts')
            setAccounts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setModalOpen(false)
            setNewAccount('')
            setEditAccount(null)
        }
    }

    const createAccount = () => {
        setModalOpen(true)
        setEditAccount(null)
    }

    const updateAccount = (account) => {
        setModalOpen(true)
        setEditAccount(account)
        setNewAccount(account.account)
    }

    const deleteAccount = async (accountId) => {
        try {
            await axios.patch(`http://localhost:8000/api/accounts/delete-account/${accountId}`)
            const response = await axios.get('http://localhost:8000/api/accounts')
            console.log('test');
            setAccounts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditAccount(null)
        setNewAccount('')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/accounts')
                setAccounts(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <AdminLayout>
                <div className="p-4 flex justify-between items-center">
                    <div className="font-bold text-xl">Accounts</div>
                    <button onClick={createAccount} className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300">
                        Add Account <span className="font-bold">+</span>
                    </button>
                </div>
                <div>
                    <AccountsTable accounts={accounts} onEdit={updateAccount} onDelete={deleteAccount} />
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-[#E6E6E6] p-2 w-[400px] rounded-md">
                            <IoClose size={24} onClick={closeModal} className="cursor-pointer" />
                            <h2 className="text-xl font-bold mb-4 text-center"> {editAccount ? 'Confirm' : 'Create Account'}</h2>
                            <div className="w-10/12 mx-auto">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Username
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Email
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Password
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Role
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Address ID
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                    Warehouse ID
                                </label>
                                <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-2 flex justify-center items-center">
                                <ButtonWithLoading title={editAccount ? 'Confirm' : 'Create Account'} onClick={handleClick}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </div>
    )
}

export default ManageAccount