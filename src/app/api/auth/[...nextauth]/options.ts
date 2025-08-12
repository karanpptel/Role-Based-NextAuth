import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";



export const options: NextAuthOptions = {
    providers: [
            GitHubProvider({
                profile(profile: GithubProfile) {
                    //console.log(profile)
                    return {
                        ...profile,
                        role: profile.role ?? "user",
                        id:   profile.id.toString(),
                        image: profile.avatar_url,
                    }
                },
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string,
            }),

            CredentialsProvider({
                name: "Credentials",

                credentials: {
                    username: { label: "Username", type: "text", placeholder: "Enter your username" },
                    password: { label: "Password", type: "password", placeholder: "Enter your password" },

                },

                async authorize(credentials) {
                    // this is where you need to retrieve user data 
                    // To verify with credentials
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the `req` object to obtain additional parameters
                    const user = { id: "1", name: "J Smith", password: "nextauth", role: "admin" };

                    if (credentials?.username === user.name && credentials?.password === user.password) {
                        return user;
                    } else {
                        return null;
                    }
                }
            })
    ],
    callbacks: {
        //https://authjs.dev/guides/role-based-access-control?_gl=1*qmp8c1*_gcl_au*NDcwNTE2NTEzLjE3NTQ5NzQ1MTEuMTA3OTE2MTY2Ni4xNzU0OTc3MTY1LjE3NTQ5ODAzMDc.&framework=Next.js
        async jwt({token, user}) {
            if(user) {
                token.role = user.role;
            }
            return token;
        },
        //if you want to use role in client component
        async session({session, token}) {
            if (session?.user) {
                session.user.role = token.role
            }
            return session;
        }
    }
}