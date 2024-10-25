
const z=require("zod")
// Define the signup schema with Zod
const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string(),
});

const signinBody = z.object({
    username: z.string(),
	password: z.string()
})

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


module.exports={
     signupSchema,
     signinBody,
     updateBody
}