import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Esto es un ejemplo - debes adaptarlo a tus necesidades de autenticación
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        // En un entorno real, aquí verificarías las credenciales contra tu base de datos
        // Este es un ejemplo de prueba
        if (credentials.email === 'admin@electrohuila.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            name: 'Administrador',
            email: credentials.email,
            role: 'admin'
          };
        }
        
        if (credentials.email === 'usuario@electrohuila.com' && credentials.password === 'usuario123') {
          return {
            id: '2',
            name: 'Usuario',
            email: credentials.email,
            role: 'user'
          };
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'tu_secreto_aqui'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };