
package   entidades.conector;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.*;

public class MenuCadastroSwing {
    // Configurações de conexão com o banco de dados MySQL
    private static final String URL = "jdbc:mysql://localhost:3306/exemplobd?useTimezone=true&serverTimezone=UTC";
    private static final String USUARIO = "root";
    private static final String SENHA = "1234";

    // Método auxiliar para estabelecer a conexão com o banco de dados
    private static Connection conectar() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, SENHA);
    }

    // Método para cadastrar mensagem no banco de dados
    private static void cadastrarMensagem() {
        try (Connection conn = conectar()) {
            // Verifica se o usuário existe na tabela 'usuario'
            int usuarioId = obterUsuarioIdPorNome("Nome do Usuário");
            if (usuarioId != -1) {
                // Insere a mensagem na tabela 'mensagem'
                String sql = "INSERT INTO mensagem (usuario_id, destinatario, mensagem, data_envio, status1, status2, status3) " +
                             "VALUES (?, ?, ?, ?, ?, ?, ?)";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setInt(1, usuarioId);
                stmt.setString(2, "Destinatário");
                stmt.setString(3, "Conteúdo da Mensagem");
                stmt.setString(4, "2024-06-07 12:00:00"); // Substitua pela data de envio desejada
                stmt.setString(5, "status1");
                stmt.setString(6, "status2");
                stmt.setString(7, "status3");
                stmt.executeUpdate();
                JOptionPane.showMessageDialog(null, "Mensagem cadastrada com sucesso!");
            } else {
                JOptionPane.showMessageDialog(null, "Usuário não encontrado!");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Erro ao cadastrar mensagem: " + ex.getMessage());
        }
    }

    // Método para obter o ID do usuário a partir do nome
    private static int obterUsuarioIdPorNome(String nome) {
        // Implemente a lógica para obter o ID do usuário a partir do nome
        // Consulte o banco de dados e retorne o ID correspondente
        return -1; // Retorna -1 se o usuário não for encontrado
    }

    public static void main(String[] args) {
        // Chame o método cadastrarMensagem() ou adicione a chamada em algum evento da interface gráfica
    }
}
