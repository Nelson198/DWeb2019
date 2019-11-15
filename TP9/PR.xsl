<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="PR.html">
            <html>
                <head>
                    <title><xsl:value-of select="pr/metadata/title"/></title>
                    <meta charset="UTF-8"/>
                </head>
                <body style="margin: 1%">
                    <h1 align="center"><xsl:value-of select="pr/metadata/title"/></h1>
                    <xsl:if test="pr/metadata/subtitle">
                        <h2 align="center"><xsl:value-of select="pr/metadata/subtitle"/></h2>    
                    </xsl:if>
                    <hr/>
                    <table align="center">
                        <tbody>
                            <tr>
                                <td width="50%" align="left">
                                    <b>KEY-NAME: </b><xsl:value-of select="pr/metadata/keyname"/>
                                </td>
                                <td width="50%" align="right">
                                    <b>BEGIN DATE: </b><xsl:value-of select="pr/metadata/bdate"/>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" align="left">
                                    <b>TITLE: </b><xsl:value-of select="pr/metadata/title"/>
                                </td>
                                <td width="50%" align="right">
                                    <b>END DATE: </b><xsl:value-of select="pr/metadata/edate"/>
                                </td>
                            </tr>
                            <tr>
                                <xsl:if test="pr/metadata/subtitle">
                                    <td width="50%" align="left">
                                        <b>SUBTITLE: </b><xsl:value-of select="pr/metadata/subtitle"/>
                                    </td>
                                </xsl:if>
                                <td width="50%" align="right">
                                    <b>SUPERVISOR: </b>
                                    <xsl:choose>
                                        <xsl:when test="pr/metadata/supervisor/@homepage">
                                            <a href="{pr/metadata/supervisor/@homepage}" target="_blank"><xsl:value-of select="pr/metadata/supervisor"/></a>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="pr/metadata/supervisor"/>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <hr/>
                    <h3>Workteam:</h3>
                    <ol>
                        <xsl:for-each select="pr/workteam/worker">
                            <li><xsl:value-of select="./name"/></li>
                            <ul>
                                <li><xsl:value-of select="./identifier"/></li>
                                <li><b>Email: </b><xsl:value-of select="./email"/></li>
                                <xsl:if test="./git">
                                    <li><b><i>Github: </i></b><a href="{./git}" target="_blank"><xsl:value-of select="./git"/></a></li>
                                </xsl:if>
                            </ul>
                        </xsl:for-each>
                    </ol>
                    <hr/>
                    <hr/>
                    <h3>Abstract:</h3>
                    <xsl:for-each select="pr/abstract/p">
                        <p style="text-align: justify"><xsl:apply-templates select="text()|b|i|u|xref"/></p>
                    </xsl:for-each>
                    <hr/>
                    <xsl:if test="pr/deliverables">
                        <hr/>
                        <h3>Deliverables:</h3>
                        <ul>
                            <xsl:for-each select="pr/deliverables/deliverable">
                                <li><a href="{@path}"><xsl:value-of select="."/></a></li>
                            </xsl:for-each>
                        </ul>
                    </xsl:if>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates select="text()|i|u|xref"/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates select="text()|b|u|xref"/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates select="text()|b|i|xref"/></u>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}" target="_blank"><xsl:apply-templates select="text()"/></a>
    </xsl:template>
    
</xsl:stylesheet>