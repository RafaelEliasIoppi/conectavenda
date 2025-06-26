package entidades;

public class Usuario {
    private int usuarioId;
    private String nome;
    private int nivel;
    private String setor;
    public int getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getNivel() {
        return nivel;
    }
    public void setNivel(int nivel) {
        this.nivel = nivel;
    }
    public String getSetor() {
        return setor;
    }
    /**
     * @param setor
     */
    public void setSetor(String setor) {
        this.setor = setor;
    }
}
    