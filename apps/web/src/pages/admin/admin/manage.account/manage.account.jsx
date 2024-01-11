import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminLayout from '../../../../components/AdminLayout'
import AccountsTable from '../../../../components/AccountsTable'
import ButtonWithLoading from '../../../../components/ButtonWithLoading'
import { IoClose } from 'react-icons/io5'

function ManageAccount() {
    const [accounts, setAccounts] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newAddress_id, setNewAddress_id] = useState('')
    const [newWarehouse_id, setNewWarehouse_id] = useState('')
    const [editAccount, setEditAccount] = useState(null)

    const handleClick = async () => {
        try {
            if (editAccount) {
                await axios.patch(`http://localhost:8000/api/accounts/update-account/${editAccount.id}`, {
                    username: newUsername,
                    email: newEmail,
                    address_id: newAddress_id,
                    warehouse_id: newWarehouse_id,
                })
            } else {
                await axios.post('http://localhost:8000/api/accounts/create-account', {
                    username: newUsername,
                    email: newEmail,
                    password: newPassword,
                    address_id: newAddress_id,
                    warehouse_id: newWarehouse_id,
                    role: 'admin'
                })
            }
            const response = await axios.get('http://localhost:8000/api/accounts')
            const admins = response.data.filter((admin) => (
                admin.role === 'admin'
            ))

            setAccounts(admins)

        } catch (error) {
            console.log(error);
        } finally {
            setModalOpen(false)
            setNewUsername('')
            setNewEmail('')
            setNewAddress_id('')
            setNewWarehouse_id('')
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
        setNewUsername(account.username)
        setNewEmail(account.email)
        setNewAddress_id(account.address_id)
        setNewWarehouse_id(account.warehouse_id)
    }

    const deleteAccount = async (accountId) => {
        try {
            await axios.patch(`http://localhost:8000/api/accounts/delete-account/${accountId}`)
            const response = await axios.get('http://localhost:8000/api/accounts')
            const admins = response.data.filter((admin) => (
                admin.role === 'admin'
            ))

            setAccounts(admins)
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditAccount(null)
        setNewUsername('')
        setNewPassword('')
        setNewEmail('')
        setNewAddress_id('')
        setNewWarehouse_id('')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/accounts')
                const admins = response.data.filter((admin) => (
                    admin.role === 'admin'
                ))
                setAccounts(admins)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <AdminLayout>
                <div className="p-4 flex justify-between items-center bg-white">
                    <div className="font-bold text-xl">Warehouse Admins</div>
                    <button
                        onClick={createAccount}
                        style={{ cursor: 'pointer' }}
                        className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
                    >
                        Create Account <span className="font-bold">+</span>
                    </button>
                </div>
                <div className="p-4">
                    <AccountsTable
                        accounts={accounts}
                        onEdit={updateAccount}
                        onDelete={deleteAccount}
                    />
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-[#E6E6E6] p-2 w-[400px] rounded-md">
                            <IoClose
                                size={24}
                                onClick={closeModal}
                                className="cursor-pointer"
                            />
                            <h2 className="text-xl font-bold mb-4 text-center">
                                {editAccount ? 'Confirm Edit' : 'Create Account'}
                            </h2>
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-[#E6E6E6] p-2 w-[400px] rounded-md">
                                        <IoClose size={24} onClick={closeModal} className="cursor-pointer" />
                                        <h2 className="text-xl font-bold mb-4 text-center">
                                            {editAccount ? 'Confirm Edit' : 'Create Account'}
                                        </h2>
                                        <div className="w-10/12 mx-auto">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                Username
                                            </label>
                                            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                Email
                                            </label>
                                            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                Address ID
                                            </label>
                                            <input type="text" value={newAddress_id} onChange={(e) => setNewAddress_id(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                Warehouse ID
                                            </label>
                                            <input type="text" value={newWarehouse_id} onChange={(e) => setNewWarehouse_id(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            {!editAccount ? (
                                                <div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                        Password
                                                    </label>
                                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <div className="mt-2 flex justify-center items-center">
                                            <ButtonWithLoading
                                                title={editAccount ? 'Confirm Edit' : 'Create Account'}
                                                onClick={handleClick}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="mt-2 flex justify-center items-center">
                                <ButtonWithLoading
                                    title={editAccount ? 'Confirm Edit' : 'Create Account'}
                                    onClick={handleClick}
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
