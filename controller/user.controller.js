import db from "../config/db.js";

//get all  data

export async function getClass(req, res) {
  try {
    const result = await db.query("SELECT * FROM students");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ 
    message: "Database Error", error });
  }
}


//get single data


export async function getSingleData(req, res) {
  const { student_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM students WHERE student_id = $1",
      [student_id]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({
        message: "Data fetched successfully",
        success: true,
        data: result.rows[0]
      });
    }

    return res.status(404).json({
      message: "Student Not Found",
      success: false
    });

  } catch (error) {
    return res.status(500).json({
      message: "Database Error",
      success: false,
      error
    });
  }
}


// Insert data
export async function addData(req, res) {
    const { name, address, mobile, age } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO students (name, address, mobile, age) VALUES ($1, $2, $3, $4)",
            [name, address, mobile, age]
        );

        return res.status(200).json({
            message: "Data inserted successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error inserting data",
            success: false
        });
    }
}


// update data
export async function updateData(req, res) {
    const { student_id } = req.params;
    const { name, address, mobile, age } = req.body;


    try {

        if(!name || !address ||!mobile ||!age){
            return res.status(400).json({
                message:"all field required"
            })

        }
    
        const result = await db.query(
            "UPDATE students SET name = $1, address = $2, mobile = $3, age = $4 WHERE student_id = $5",
            [name, address, mobile, age, student_id]
        );

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: "Data updated successfully",
                success: true
            });
        } 
        else {
            return res.status(404).json({
                message: "Student not found",
                success: false
            });
        }

    }
     catch (error) {
        return res.status(500).json({
            message: "Server Error",
            success: false,
            error
        });
    }
}

//delete data

export async function deleteData (req,res)  {
    const{student_id}=req.params;
    try {
   const result=await db.query(
    "DELETE FROM students WHERE  student_id=$1",[student_id]

   );
   if(result.rowCount>0){
    return res.status(200).json({
        message:"data deleted successfully ",
        success:true,
    })
    
   }
    else{
        return res.status(404).json({
            message:"not found",
            success:false
        })
    }    
    } catch (error) {
        return res.status(500).json({
            message:"server error",
            error
        })
        
    }
    
}


//upsert Query

export async function upSert(req,res) {
    const{student_id,name,address,mobile,age}=req.body;
    // const{student_id}=req.params;
  
    try {
if(student_id>0){

     if(!name || !address ||!mobile ||!age){
            return res.status(400).json({
                message:"all field required"
            })

        }
   
    const result=await db.query(
        "UPDATE students SET name = $1, address = $2, mobile = $3, age = $4 WHERE student_id = $5",
            [name, address, mobile, age, student_id]
    )
    if(result.rowCount>0){
        return res.status(200).json({
            message:"update successfull",
            success:true,
           
        })
    }
}

else{
    const result=await db.query(
        "INSERT INTO students (name,address,mobile,age) VALUES($1,$2,$3,$4)",
        [name,address,mobile,age]
    );
    return res.status(200).json({
        message:"data insert successfully",
        success:true
       
    })
}

        
    } catch (error) {
        return res.status(500).json({
            message:"server errro",
            error
        })
        
    }
    
}