const {mongoose } = require("mongoose");
const connectionRequestModal = require("../modals/connectionRequest");
const userModal = require('../modals/user')

//this is for accepted and ignored
const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    console.log('req',req.user._id,toUserId,status)
    const allowedStatus = ["interested", "ignored"];
    //status check
    const isAllowedStatus = allowedStatus.includes(status);
    if (!isAllowedStatus) throw new Error(`${status} is not vaild`);

    //check touser in userlist
    const checktoUserId = await userModal.findById(toUserId)
    console.log("checktoUserId",checktoUserId)
    if(!checktoUserId) throw new Error(`${toUserId} not exists`)

    //check for an existing connection
    const existingConnection = await connectionRequestModal.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if(existingConnection) throw new Error('connection request already there')
    const saveConnectionRequset = new connectionRequestModal({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status,
    });
    const data = await saveConnectionRequset.save();
    res.status(200).json({
      message: "Connection Request Sent Successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

const reviewConnectionRequest = async(req,res)=>{
    try{
        const user = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;
        const allowedStatus = ["accepted","rejected"]
        const isAllowedStatus = allowedStatus.includes(status)
        if(!isAllowedStatus) throw new Error(`${status} is not allowed`)
        if(!mongoose.Types.ObjectId.isValid(requestId)) throw new Error(`invalid id ${requestId}`)
            console.log('cccccccccccc',requestId,user._id)
        const connectionRequest = await connectionRequestModal.findOne({
            _id:requestId,
            toUserId:user._id,
            status:"interested"
        })

        if(!connectionRequest) throw new Error('connection request not found')
            console.log('4444444444444444444444')
        connectionRequest.status = status;
        console.log("5555555555",connectionRequest)
        const data = await connectionRequest.save();
        res.send(data)
        res.status(200).json({
            message:"requset"+ status,
            data
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

module.exports = { sendConnectionRequest,reviewConnectionRequest };
