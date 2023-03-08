import AvatarImage from "../../assets/avatarImg.png"

function profileCard({metaData}:any) {
    return ( <div className="bg-white border border-gray-200 rounded-lg shadow-md sm: m-4 dark:bg-sidebar-bg">
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg pt-4" src={metaData.profilePic === '' || undefined ? AvatarImage : metaData.profilePic} alt="avatar image"/>
        <h5 className="mb-1 text-xl font-medium text-dark-text dark:text-gray-1">{metaData.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-1">{metaData.nip05 === undefined ? 'nip05 not found' : metaData.nip05}</span>
        <span className="text-sm text-gray-500 dark:text-gray-1">⚡ {metaData.LnAddress === undefined ? 'LN address not found' : metaData.LnAddress}</span>
        <span className="text-sm text-gray-500 dark:text-gray-1 text-center px-6">{metaData.about === undefined ? 'about not found' : metaData.about}</span>
    </div>
</div> );
}

export default profileCard;