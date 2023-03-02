Private Sub calculDecoucher()
        Dim DateD, DateR As Date
        Dim NbreDecoucher, NbreJours As Double
        Dim HeureD, HeureR As String
        Dim vDistance As Integer
        Dim vMontantUnitDecoucher As Double
        Dim vProportionnel As Boolean
        Dim vProportion As Double
        Dim HeureMin As String
        Dim HeureMax As String
        Dim vMode_Frais As String

        
        NbreDecoucher = 0
        vMontantUnitDecoucher = 0

        vMode_Frais = Mode_FraisTextBox.Text
        vDistance = DistanceTextBox.Text
        DateD = Date_RetourDateTimePicker.Value.ToShortDateString
        DateR = Date_DepartDateTimePicker.Value.ToShortDateString

        HeureD = TimeValue(Heure_DepartTextBox.Text)
        HeureR = TimeValue(Heure_RetourTextBox.Text)

        NbreJours = DateDiff(DateInterval.Day, DateR, DateD)
        NbreDecoucher = NbreJours

        If NbreDecoucher > 0 Then
            NbreDecoucher = NbreDecoucher - 1
        End If

        'Compter un découcher si l'heure de départ est comprise dans l'intervale de découcher
        ds.Clear()

        Cmd.Connection = Con
        Cmd.CommandText = "select * from Rubrique_Frais where Mode='" & vMode_Frais & "' and Rubrique='DECOUCHER' and KM_MIN <=" & vDistance & " and KM_MAX >=" & vDistance & ""
        Cmd.CommandType = CommandType.Text
        da.SelectCommand = Cmd
        da.Fill(ds, "Rubrique_Frais")
        dt = ds.Tables("Rubrique_Frais")

        If dt.Rows.Count > 0 Then
            Line = dt.Rows(0)
            vMontantUnitDecoucher = Line("Montant")
            vProportionnel = Line("Proportionnel")
            HeureMin = TimeValue(Line("Hrs_Min"))
            HeureMax = TimeValue(Line("Hrs_Max"))

            If NbreJours > 0 Then
                'calcul pour le jour de départ
                If HeureD <= HeureMax Then
                    vProportion = (Hour(HeureMax) - Hour(HeureD)) / (Hour(HeureMax) - Hour(HeureMin))
                    NbreDecoucher = NbreDecoucher + vProportion
                End If

                'calcul pour le jour de retour
                If HeureR >= HeureMax Then
                    NbreDecoucher = NbreDecoucher + 1
                Else
                    vProportion = (Hour(HeureR) - Hour(HeureMin)) / (Hour(HeureMax) - Hour(HeureMin))
                    NbreDecoucher = NbreDecoucher + vProportion
                End If
            Else
                If HeureR >= HeureMax Then
                    vProportion = (Hour(HeureMax) - Hour(HeureD)) / (Hour(HeureMax) - Hour(HeureMin))
                Else
                    vProportion = (Hour(HeureR) - Hour(HeureD)) / (Hour(HeureMax) - Hour(HeureMin))
                End If
                NbreDecoucher = NbreDecoucher + vProportion
            End If

        Else
            NbreDecoucher = 0
            vMontantUnitDecoucher = 0
        End If


        If NbreDecoucher <= 0 Then
            NbreDecoucher = 0
            vMontantUnitDecoucher = 0
        End If

        Montant_Unit_DECOUCHERTextBox.Text = vMontantUnitDecoucher
        Montant_Unit_DECOUCHERTextBox.Text = Format(CDec(Montant_Unit_DECOUCHERTextBox.Text), "#, ##0.00")
        Nbre_DECOUCHERTextBox.Text = NbreDecoucher

        If Nb_Dec_NPECTextBox.Text = 0 Then
            Nb_Dec_PECTextBox.Text = NbreDecoucher
        End If

        Nbre_DECOUCHERTextBox.Text = Format(CDec(Nbre_DECOUCHERTextBox.Text), "#, ##0.00")
        Nb_Dec_PECTextBox.Text = Format(CDec(Nb_Dec_PECTextBox.Text), "#, ##0.00")
        Nb_Dec_NPECTextBox.Text = Format(CDec(Nb_Dec_NPECTextBox.Text), "#, ##0.00")

    End Sub

