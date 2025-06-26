package entidades;

import DAO.MensagemDao;
import java.awt.*;
import java.awt.event.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.swing.*;

public class Consultas extends JFrame implements ActionListener {
    private JComboBox<String> nomeComboBox, setorComboBox;
    private JTextField dataEnvioField;
    private JTextArea resultadoArea;
    private JButton consultarButton, consultarTodosButton;

    private String[] nomes;
    private String[] setores = {"Microbiologia", "FQ", "ADM"};

    public Consultas() {
        // Configurações da janela
        setTitle("Consulta de Mensagens");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Painel superior para filtros
        JPanel filtroPanel = new JPanel(new GridLayout(4, 2, 10, 10));
        filtroPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        filtroPanel.add(new JLabel("Nome:"));
        popularNomes(); // Popula os nomes a partir da tabela usuario
        nomeComboBox = new JComboBox<>(nomes);
        filtroPanel.add(nomeComboBox);

        filtroPanel.add(new JLabel("Setor:"));
        setorComboBox = new JComboBox<>(setores);
        filtroPanel.add(setorComboBox);

        filtroPanel.add(new JLabel("Data de Envio (yyyy-MM-dd):"));
        dataEnvioField = new JTextField();
        filtroPanel.add(dataEnvioField);

        consultarButton = new JButton("Consultar");
        consultarButton.addActionListener(this);
        filtroPanel.add(consultarButton);

        consultarTodosButton = new JButton("Consultar Todos");
        consultarTodosButton.addActionListener(this);
        filtroPanel.add(consultarTodosButton);

        add(filtroPanel, BorderLayout.NORTH);

        // Área de texto para exibir resultados
        resultadoArea = new JTextArea();
        resultadoArea.setEditable(false);
        resultadoArea.setFont(new Font("Monospaced", Font.PLAIN, 12));
        add(new JScrollPane(resultadoArea), BorderLayout.CENTER);

        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        MensagemDao mensagemDao = new MensagemDao();
        List<Mensagem> mensagens;

        if (e.getSource() == consultarButton) {
            String nome = (String) nomeComboBox.getSelectedItem();
            String setor = (String) setorComboBox.getSelectedItem();
            String dataEnvio = dataEnvioField.getText();

            if ("Todos".equals(nome) && "Todos".equals(setor)) {
                mensagens = mensagemDao.consultarTodasMensagens();
            } else if (!"Todos".equals(nome) && "Todos".equals(setor)) {
                mensagens = mensagemDao.consultarMensagensPorNomeSetorData(nome, null, dataEnvio);
            } else if ("Todos".equals(nome) && !"Todos".equals(setor)) {
                mensagens = mensagemDao.consultarMensagensPorNomeSetorData(null, setor, dataEnvio);
            } else {
                mensagens = mensagemDao.consultarMensagensPorNomeSetorData(nome, setor, dataEnvio);
            }

        } else if (e.getSource() == consultarTodosButton) {
            mensagens = mensagemDao.consultarTodasMensagens();
        } else {
            return;
        }

        // Exibição dos resultados
        resultadoArea.setText("");
        for (Mensagem mensagem : mensagens) {
            resultadoArea.append("ID: " + mensagem.getCodigo() + "\n");
            resultadoArea.append("Nome: " + mensagem.getNome() + "\n");
            resultadoArea.append("Setor: " + mensagem.getSetor() + "\n");
            resultadoArea.append("Destinatário: " + mensagem.getDestinatario() + "\n");
            resultadoArea.append("Mensagem: " + mensagem.getMensagem() + "\n");
            resultadoArea.append("Data de Envio: " + mensagem.getDataEnvio() + "\n");
            resultadoArea.append("Status: " + mensagem.getStatus1() + "\n");
            resultadoArea.append("Status: " + mensagem.getStatus2()+ "\n");
            resultadoArea.append("Status: " + mensagem.getStatus3()+ "\n");
            resultadoArea.append("-------------------------------------------------\n");
        }
    }

    // Método para popular os nomes a partir da tabela usuario
    private void popularNomes() {
    Connection conexao = null;
    Statement stmt = null;
    ResultSet rs = null;
    
    try {
        // Carregar o driver JDBC para o banco de dados que você está usando
        Class.forName("com.mysql.jdbc.Driver"); // Este é um exemplo para o MySQL. Substitua pelo driver correto do seu banco de dados.
        
        // Estabelecer conexão com o banco de dados
        conexao = DriverManager.getConnection("jdbc:mysql://localhost:3306/exemplobd", "root", "1234");
        
        // Criar uma instrução SQL
        stmt = conexao.createStatement();
        
        // Executar a consulta
        rs = stmt.executeQuery("SELECT nome FROM usuario");
        
        // Lista para armazenar os nomes obtidos da consulta
        List<String> nomesList = new ArrayList<>();
        
        // Preencher a lista com os nomes retornados pela consulta
        while (rs.next()) {
            String nome = rs.getString("nome");
            nomesList.add(nome);
        }
        
        // Converte a lista para um array de Strings
        nomes = nomesList.toArray(new String[0]);
    } catch (ClassNotFoundException | SQLException ex) {
        ex.printStackTrace();
        System.out.println("Erro ao executar a consulta SQL: " + ex.getMessage());
    } finally {
        // Fechar os recursos
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conexao != null) {
            try {
                conexao.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}

    public static void main(String[] args) {
        new Consultas();
    }
}