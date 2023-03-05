import AvatarImage from "../../assets/avatarImg.png"

function profileCard({metaData}:any) {
    return ( <div className="bg-white border border-gray-200 rounded-lg shadow-md sm: m-4">
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg pt-4" src={metaData.profilePic === '' ? AvatarImage : metaData.profilePic} alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900">{metaData.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{metaData.nip05 === undefined ? 'nip05 not found' : metaData.nip05}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">⚡ {metaData.LnAddress === undefined ? 'LN address not found' : metaData.LnAddress}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center px-6">{metaData.about === undefined ? 'about not found' : metaData.about}</span>
    </div>
</div> );
}

export default profileCard;