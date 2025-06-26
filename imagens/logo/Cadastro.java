package servicos;

import DAO.MensagemDao;
import entidades.Mensagem;
import java.util.List;

public class Cadastro {

    private MensagemDao mensagemDao;

    public Cadastro() {
        this.mensagemDao = new MensagemDao();
    }

    public int cadastrarMensagem(String nome, String setor, String destinatario, String mensagemTexto, String dataEnvio, String status1) {
        Mensagem mensagem = new Mensagem(nome, setor, destinatario, mensagemTexto, dataEnvio);
        mensagem.setStatus1(status1);
        return mensagemDao.cadastrarMensagem(mensagem);
    }

    public List<Mensagem> consultarMensagensPorNomeSetorData(String nome, String setor, String dataEnvio) {
        return mensagemDao.consultarMensagensPorNomeSetorData(nome, setor, dataEnvio);
    }

    public List<Mensagem> consultarTodasMensagens() {
        return mensagemDao.consultarTodasMensagens();
    }

    public List<Mensagem> consultarMensagensPorSetorData(String setor, String dataEnvio) {
        return mensagemDao.consultarMensagensPorSetorData(setor, dataEnvio);
    }

    public MensagemDao getMensagemDao() {
        return mensagemDao;
    }
}
