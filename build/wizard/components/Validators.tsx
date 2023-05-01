import {
    ChevronDownIcon
} from '@heroicons/react/20/solid'
import { server_config } from '../server_config';

import { useStaderStatus } from "../lib/status"
import AddValidator from './AddValidator';
import { abbreviatePublicKey, beaconchainUrl } from "../utils/utils"
import { useBeaconChainClientAndValidator, useNetwork, useRunningValidatorInfos } from '../hooks/useServerInfo';
import { ValidatorStates } from '../types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons";


const Validators = () => {

    const { nodeStatus } = useStaderStatus()
    const { network } = useNetwork()
    const { bcClient } = useBeaconChainClientAndValidator()
    const { validatorInfos, refetch } = useRunningValidatorInfos()
    const expectedRecipient = "0xe624471812F4fb739dD4eF40A8f9fAbD9474CEAa" // FIXME: where to get this?

    const decodeKey = (encodedString: string) => "0x" + Buffer.from(encodedString, 'base64').toString('hex')

    const isRunningValidator = (pubkey: string) => validatorInfos.some(i => i.pubkey == pubkey)

    const isFeeRecipientAddressCorrect = (pubkey: string) => (validatorInfos.find(i => i.pubkey === pubkey)?.recipient.ethaddress == expectedRecipient)

    const statusRunningValidator = (pubkey: string) => validatorInfos.find(i => i.pubkey === pubkey)?.data?.status ?? "pending_initialized"

    const importValidator = (pubkey: string) => {
        const api_url: string = `${server_config.monitor_url}/importValidator`;
        const data = { "pubkey": pubkey }

        fetch(api_url, {
            method: 'POST',
            headers: { 'content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data),
        }).then(async r => {
            const result = await r.text()
            refetch()
            // next: set fee recipient too
            setFeeRecipient(pubkey)
        }).catch(e => {
            console.log(e)
        })
    }

    const setFeeRecipient = (pubkey: string) => {
        const api_url: string = `${server_config.monitor_url}/setFeeRecipient`;

        const data = {
            pubkey: pubkey,
            feeRecipientAddress: expectedRecipient
        }

        fetch(api_url, {
            method: 'POST',
            headers: { 'content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data),
        }).then(async r => {
            const result = await r.text()
            refetch()
        }).catch(e => {
            console.log(e)
        })
    }

    const validatorsTable = () => {
        return (
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Validators</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all your Stader validators.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <AddValidator currentNumberOfValidators={nodeStatus.validatorInfos.length} />
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            <a href="#" className="group inline-flex">
                                                PubKey
                                                <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <a href="#" className="group inline-flex">
                                                Stader Status
                                                <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <a href="#" className="group inline-flex">
                                                Validator Status
                                                <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-0">
                                            <span className="sr-only">Fee recipient</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {nodeStatus.validatorInfos.map((validator) => (
                                        <tr key={validator.Pubkey}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {beaconchainUrl(network, decodeKey(validator.Pubkey), <><FontAwesomeIcon className="icon" icon={faSatelliteDish} /> {abbreviatePublicKey(decodeKey(validator.Pubkey))}</>)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ValidatorStates[validator.Status]}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {isRunningValidator(decodeKey(validator.Pubkey)) ? (
                                                    <>
                                                        {statusRunningValidator(decodeKey(validator.Pubkey))}
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                            onClick={() => importValidator(decodeKey(validator.Pubkey))}>
                                                            Import into {bcClient.name}
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                                {isFeeRecipientAddressCorrect(decodeKey(validator.Pubkey)) ? "✅" : "⚠️"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }


    return (
        <>
            {nodeStatus.registered ? (
                <>
                    {validatorsTable()}
                </>
            ) : (
                <>
                    <p>No validators yet</p>
                </>
            )}
        </>
    )
}

export default Validators;
