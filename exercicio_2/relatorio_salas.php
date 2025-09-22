<?php

$horariosOcupadosRaw = [
    ['nome_predio' => 'Prédio Principal', 'id_sala' => 101, 'dia_da_semana' => 'Segunda', 'horario_inicio' => '08:00:00', 'horario_fim' => '10:00:00', 'nome_materia' => 'Cálculo I'],
    ['nome_predio' => 'Prédio Principal', 'id_sala' => 101, 'dia_da_semana' => 'Segunda', 'horario_inicio' => '14:00:00', 'horario_fim' => '16:00:00', 'nome_materia' => 'Álgebra Linear'],
    ['nome_predio' => 'Prédio Principal', 'id_sala' => 102, 'dia_da_semana' => 'Terça', 'horario_inicio' => '10:00:00', 'horario_fim' => '12:00:00', 'nome_materia' => 'Física I'],
    ['nome_predio' => 'Anexo B', 'id_sala' => 201, 'dia_da_semana' => 'Quarta', 'horario_inicio' => '09:00:00', 'horario_fim' => '11:00:00', 'nome_materia' => 'Programação I'],
    ['nome_predio' => 'Anexo C', 'id_sala' => 301, 'dia_da_semana' => null, 'horario_inicio' => null, 'horario_fim' => null, 'nome_materia' => null],
];

/**
 * Estrutura os dados brutos do SQL em um array aninhado e organizado.
 */
function estruturarHorarios(array $dadosBrutos): array
{
    $estrutura = [];
    foreach ($dadosBrutos as $linha) {
        $chave = $linha['nome_predio'] . ' - Sala ' . $linha['id_sala'];
        if (!isset($estrutura[$chave])) {
            $estrutura[$chave] = [
                'Segunda' => [], 'Terça' => [], 'Quarta' => [], 'Quinta' => [], 'Sexta' => [],
            ];
        }
        if ($linha['dia_da_semana']) {
            $estrutura[$chave][$linha['dia_da_semana']][] = [
                'inicio' => $linha['horario_inicio'],
                'fim' => $linha['horario_fim'],
                'materia' => $linha['nome_materia'],
            ];
        }
    }
    return $estrutura;
}

/**
 * Calcula os horários livres com base nos horários ocupados.
 */
function calcularHorariosLivres(array $horariosEstruturados): array
{
    $relatorioFinal = [];
    $inicioDia = '08:00:00';
    $fimDia = '18:00:00';

    foreach ($horariosEstruturados as $sala => $dias) {
        $relatorioFinal[$sala] = [];
        foreach ($dias as $dia => $aulasOcupadas) {
            $horariosLivres = [];
            $ultimoHorarioOcupado = $inicioDia;

            if (empty($aulasOcupadas)) {
                $horariosLivres[] = ['inicio' => $inicioDia, 'fim' => $fimDia];
            } else {
                foreach ($aulasOcupadas as $aula) {
                    if ($aula['inicio'] > $ultimoHorarioOcupado) {
                        $horariosLivres[] = ['inicio' => $ultimoHorarioOcupado, 'fim' => $aula['inicio']];
                    }
                    $ultimoHorarioOcupado = $aula['fim'];
                }
                if ($fimDia > $ultimoHorarioOcupado) {
                    $horariosLivres[] = ['inicio' => $ultimoHorarioOcupado, 'fim' => $fimDia];
                }
            }

            $relatorioFinal[$sala][$dia] = [
                'ocupado' => $aulasOcupadas,
                'livre' => $horariosLivres,
            ];
        }
    }
    return $relatorioFinal;
}

$horariosEstruturados = estruturarHorarios($horariosOcupadosRaw);
$relatorioCompleto = calcularHorariosLivres($horariosEstruturados);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($relatorioCompleto, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);