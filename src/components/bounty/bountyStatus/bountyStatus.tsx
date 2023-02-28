
interface currentBountyStatus {
    status: string
}

function bountyStatus(bountyStatus: currentBountyStatus) {
    return ( <div>
             <p>{bountyStatus.status}</p>
             </div> );
}

export default bountyStatus;