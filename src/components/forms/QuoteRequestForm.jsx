import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

import emailjs from '@emailjs/browser';

// Chave para localStorage
const STORAGE_KEY = 'quoteFormData';

function QuoteRequestForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    dataIda: null,
    dataRetorno: null,
    flexibilidadeDatas: '', // 'sim', 'nao'
    numeroAdultos: 1,
    numeroCriancas: 0,
    bagagens: 0,
    servicos: [], // ['Hotel', 'Transfer', ...]
    querPacote: false,
    observacoes: '',
    childAges: [], // Campo para idades das crianças
    // uploadFile: null, // Removido
  });

  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // Carregamento inicial do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convertendo strings de datas de volta para objetos Date
        if (parsed.dataIda) parsed.dataIda = new Date(parsed.dataIda);
        if (parsed.dataRetorno) parsed.dataRetorno = new Date(parsed.dataRetorno);
        setFormData(parsed);
      } catch (e) {
        console.error('Erro ao carregar dados do localStorage:', e);
      }
    }
  }, []);

  // Salvamento no localStorage sempre que formData muda
  useEffect(() => {
    const dataToSave = { ...formData };
    // Convertendo objetos Date para strings para armazenamento
    if (dataToSave.dataIda) dataToSave.dataIda = dataToSave.dataIda.toISOString();
    if (dataToSave.dataRetorno) dataToSave.dataRetorno = dataToSave.dataRetorno.toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [formData]);

  // Função para atualizar campos do formulário
  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };
      
      // Se o campo alterado for 'numeroCriancas', ajustar o array 'childAges'
      if (field === 'numeroCriancas') {
        const currentAges = prev.childAges;
        const newAges = [...currentAges];
        
        if (value > currentAges.length) {
          // Adicionar entradas vazias para as novas crianças
          for (let i = currentAges.length; i < value; i++) {
            newAges.push('');
          }
        } else if (value < currentAges.length) {
          // Remover entradas excedentes
          newAges.splice(value);
        }
        
        updatedData.childAges = newAges;
      }
      
      return updatedData;
    });
  };

  // Função para lidar com seleção de serviços extras
  const handleServicoChange = (service) => {
    setFormData((prev) => {
      const current = prev.servicos;
      if (current.includes(service)) {
        return { ...prev, servicos: current.filter((s) => s !== service) };
      } else {
        return { ...prev, servicos: [...current, service] };
      }
    });
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    // Dados Pessoais
    if (!formData.nome.trim()) newErrors.nome = 'Informe seu nome completo.';
    if (!formData.email.trim()) {
      newErrors.email = 'Informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }

    // Dados da Viagem
    if (!formData.origem.trim()) newErrors.origem = 'Informe a cidade de origem.';
    if (!formData.destino.trim()) newErrors.destino = 'Informe a cidade de destino.';
    if (!formData.dataIda) newErrors.dataIda = 'Selecione a data de ida.';
    if (!formData.dataRetorno) newErrors.dataRetorno = 'Selecione a data de retorno.';
    if (
      formData.dataIda &&
      formData.dataRetorno &&
      formData.dataRetorno.getTime() < formData.dataIda.getTime()
    ) {
      newErrors.dataRetorno = 'Data de retorno não pode ser antes da data de ida.';
    }
    if (formData.numeroAdultos < 1) newErrors.numeroAdultos = 'Deve haver pelo menos 1 adulto.';
    if (formData.numeroCriancas < 0) newErrors.numeroCriancas = 'Número de crianças inválido.';
    if (formData.bagagens < 0) newErrors.bagagens = 'Número de bagagens inválido.';

    // Idades das Crianças
    if (formData.numeroCriancas > 0) {
      formData.childAges.forEach((age, index) => {
        if (age === '') {
          newErrors[`childAge_${index}`] = `Informe a idade da criança ${index + 1}.`;
        } else if (isNaN(age) || age < 0) {
          newErrors[`childAge_${index}`] = `Idade inválida para a criança ${index + 1}.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll até o primeiro erro
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Configuração do EmailJS
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const emailData = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      origem: formData.origem,
      destino: formData.destino,
      dataIda: formData.dataIda ? format(formData.dataIda, 'dd/MM/yyyy') : '',
      dataRetorno: formData.dataRetorno ? format(formData.dataRetorno, 'dd/MM/yyyy') : '',
      flexibilidade: formData.flexibilidadeDatas === 'sim' ? 'Sim' : 'Não',
      numeroAdultos: formData.numeroAdultos,
      numeroCriancas: formData.numeroCriancas,
      bagagens: formData.bagagens,
      servicos: formData.servicos.join(', ') || 'Nenhum',
      querPacote: formData.querPacote ? 'Sim' : 'Não',
      observacoes: formData.observacoes || 'Nenhuma',
      childAges: formData.childAges.join(', ') || 'Nenhuma',
      // uploadFile: formData.uploadFile ? 'Sim' : 'Não', // Removido
    };

    console.log('Dados do Email:', emailData); // Para depuração

    emailjs
      .send(serviceId, templateId, emailData, publicKey)
      .then(() => {
        setOpenModal(true);
        // Opcional: limpar formulário ou localStorage
        // setFormData({
        //   nome: '',
        //   email: '',
        //   telefone: '',
        //   origem: '',
        //   destino: '',
        //   dataIda: null,
        //   dataRetorno: null,
        //   flexibilidadeDatas: '',
        //   numeroAdultos: 1,
        //   numeroCriancas: 0,
        //   bagagens: 0,
        //   servicos: [],
        //   querPacote: false,
        //   observacoes: '',
        //   childAges: [],
        // });
        // localStorage.removeItem(STORAGE_KEY);
      })
      .catch((error) => {
        console.error('Erro ao enviar o e-mail:', error);
        alert(`Erro ao enviar: ${error.text || 'Tente novamente mais tarde.'}`);
      });
  };

  // Fechar o modal de sucesso
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          mt: 4,
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" maxWidth={350}>
          Solicitação de Cotação
        </Typography>

        {/* Seção: Dados Pessoais */}
        <section>
          <Typography variant="h6" gutterBottom>
            Dados Pessoais
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                id="field-nome"
                label="Nome Completo"
                fullWidth
                value={formData.nome}
                onChange={(e) => handleFieldChange('nome', e.target.value)}
                error={Boolean(errors.nome)}
                helperText={errors.nome}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="field-email"
                label="E-mail"
                type="email"
                fullWidth
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="field-telefone"
                label="Telefone/WhatsApp"
                type="tel"
                fullWidth
                value={formData.telefone}
                onChange={(e) => handleFieldChange('telefone', e.target.value)}
              />
            </Grid>
          </Grid>
        </section>

        {/* Seção: Dados da Viagem */}
        <section>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Dados da Viagem
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={11} sm={6}>
              <TextField
                id="field-origem"
                label="Cidade de Origem"
                fullWidth
                value={formData.origem}
                onChange={(e) => handleFieldChange('origem', e.target.value)}
                error={Boolean(errors.origem)}
                helperText={errors.origem}
              />
            </Grid>
            <Grid item xs={11} sm={6}>
              <TextField
                id="field-destino"
                label="Cidade de Destino"
                fullWidth
                value={formData.destino}
                onChange={(e) => handleFieldChange('destino', e.target.value)}
                error={Boolean(errors.destino)}
                helperText={errors.destino}
              />
            </Grid>
            <Grid item xs={11} sm={6}>
              <DatePicker
                label="Data de Ida"
                value={formData.dataIda}
                onChange={(newValue) => handleFieldChange('dataIda', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="field-dataIda"
                    fullWidth
                    error={Boolean(errors.dataIda)}
                    helperText={errors.dataIda}
                  />
                )}
              />
            </Grid>
            <Grid item xs={11} sm={6}>
              <DatePicker
                label="Data de Retorno"
                value={formData.dataRetorno}
                onChange={(newValue) => handleFieldChange('dataRetorno', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="field-dataRetorno"
                    fullWidth
                    error={Boolean(errors.dataRetorno)}
                    helperText={errors.dataRetorno}
                  />
                )}
              />
            </Grid>

            {/* Flexibilidade nas Datas */}
            <Grid item xs={11}>
              <Typography variant="subtitle1">Flexibilidade nas datas? (+/- 3 dias)</Typography>
              <RadioGroup
                row
                value={formData.flexibilidadeDatas}
                onChange={(e) => handleFieldChange('flexibilidadeDatas', e.target.value)}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </Grid>

            {/* Número de Adultos e Crianças */}
            <Grid item xs={11} sm={6}>
              <TextField
                id="field-numeroAdultos"
                label="Número de Adultos (+12)"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 1 } }}
                value={formData.numeroAdultos}
                onChange={(e) => handleFieldChange('numeroAdultos', Number(e.target.value))}
                error={Boolean(errors.numeroAdultos)}
                helperText={errors.numeroAdultos}
              />
            </Grid>
            <Grid item xs={11} sm={6}>
              <TextField
                id="field-numeroCriancas"
                label="Número de Crianças"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                value={formData.numeroCriancas}
                onChange={(e) => handleFieldChange('numeroCriancas', Number(e.target.value))}
                error={Boolean(errors.numeroCriancas)}
                helperText={errors.numeroCriancas}
              />
            </Grid>

            {/* Quantidade de Bagagens */}
            <Grid item xs={11}>
              <TextField
                id="field-bagagens"
                label="Número de Bagagens Despachadas"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                value={formData.bagagens}
                onChange={(e) => handleFieldChange('bagagens', Number(e.target.value))}
                error={Boolean(errors.bagagens)}
                helperText={errors.bagagens}
              />
            </Grid>

            {/* Campos Dinâmicos para Idades das Crianças */}
            {formData.numeroCriancas > 0 && (
              <Grid item xs={11}>
                <Typography variant="subtitle1">Idade das Crianças:</Typography>
                <Grid container spacing={2}>
                  {formData.childAges.map((age, index) => (
                    <Grid item xs={11} sm={6} key={index}>
                      <TextField
                        id={`field-childAge_${index}`}
                        label={`Idade da Criança ${index + 1}`}
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 0 } }}
                        value={age}
                        onChange={(e) => {
                          const newAges = [...formData.childAges];
                          newAges[index] = e.target.value;
                          handleFieldChange('childAges', newAges);
                        }}
                        error={Boolean(errors[`childAge_${index}`])}
                        helperText={errors[`childAge_${index}`]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </section>

        {/* Seção: Serviços Desejados */}
        <section>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Serviços Desejados
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Hotel')}
                  onChange={() => handleServicoChange('Hotel')}
                />
              }
              label="Hotel"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Transfer')}
                  onChange={() => handleServicoChange('Transfer')}
                />
              }
              label="Transfer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Locação de Carro')}
                  onChange={() => handleServicoChange('Locação de Carro')}
                />
              }
              label="Locação de Carro"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Cruzeiro')}
                  onChange={() => handleServicoChange('Cruzeiro')}
                />
              }
              label="Cruzeiro"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Passeios')}
                  onChange={() => handleServicoChange('Passeios')}
                />
              }
              label="Passeios"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Seguro Viagem')}
                  onChange={() => handleServicoChange('Seguro Viagem')}
                />
              }
              label="Seguro Viagem"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.servicos.includes('Pacote')}
                  onChange={() => handleServicoChange('Pacote')}
                />
              }
              label="Pacote"
            />
          </FormGroup>
        </section>

        {/* Seção: Observações */}
        <section>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Observações ou Requerimentos <br/>Especiais
          </Typography>
          <TextField
            id="field-observacoes"
            sx={{
              width: { xs: '90%', sm: 'auto' }, // 100% em telas móveis, auto em telas maiores
              mr: { xs: 0, sm: 2 }, // Margem direita somente em telas maiores
              mb: { xs: 2, sm: 0 }, // Margem inferior somente em telas móveis
            }}
            multiline
            rows={4}
            label="Comentários adicionais"
            value={formData.observacoes}
            onChange={(e) => handleFieldChange('observacoes', e.target.value)}
          />
        </section>

        {/* Botão Enviar */}
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Box>

        {/* Modal de Sucesso */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Solicitação Recebida!</DialogTitle>
          <DialogContent>
            <Typography>
              Dados enviados com sucesso. Em breve entraremos em contato.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}

/** ==================== PropTypes ==================== */
QuoteRequestForm.propTypes = {};

export default QuoteRequestForm;
